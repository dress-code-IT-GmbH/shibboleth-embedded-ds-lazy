/* 
 * Start discovery if neccessary to use shibboleth-embedded-ds "as is"
 * with lazy authentication.
 * 
 * If this page was accessed by the browser directly, send the browser to mod_shib login
 * with (usually) this page as target to start discovery.
 *
 * In other words: Make sure it is always mod_shib redirecting the user browser to
 * this page before IDPSelectUI() is called:
 * 
 * if(idps_prepare()){
 *        (new IdPSelectUI()).draw(new IdPSelectUIParms());
 * }
 *
 * Note: You need to comment out the last line of the original idpselect.js.
 */


// The page calling IdpSelectUI(). Usually this page.
let TARGET = window.location.href;

// Location of mod_shib Login endpoint
let SHIB_LOGIN = "https://" + window.location.hostname + "/Shibboleth.sso/Login";


let shib_login_uri = SHIB_LOGIN + '?target=' + TARGET;

function triggerDisco() {
	// if URL has no return parameter, this page was called without mod_shib
	// redirecting the browser.

	let parmlist = window.location.search.substring(1);
	let parms = parmlist.split('&');
	for (i = 0; i < parms.length; i++) {
		if (parms[i].startsWith('return')) {
			return false;
		}
	}
	return true;
}


async function startDisco() {
	// Send Browser to mod_shib to do the redirect
	try {
		let r = await fetch(shib_login_uri);
		let t = r.text();
		const u = new URL(r.url);
		window.location.search = u.search;

	} catch (error) {
		console.log(error);
		throw new Error("Cannot start discovery");
	}

}


function idps_prepare() {
	if (triggerDisco()) {
		console.log("Forcing mod_shib login");
		startDisco();
		return false;
	} else {
		console.log("redirected by mod_shib: proceeding");
		return true;
	}
}
