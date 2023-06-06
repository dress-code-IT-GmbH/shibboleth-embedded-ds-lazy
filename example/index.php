<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">

<head>
    <title>IDP select test bed</title>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-5" />
    <link rel="stylesheet" type="text/css" href="idpselect.css" />
</head>

<body>
    <?php if (isset($_SERVER["Shib-Identity-Provider"])) { ?>

        <div>
            <p>Active user session with idp: '<?php echo $_SERVER["Shib-Identity-Provider"] ?>'
            <p><a href="/Shibboleth.sso/Session">Session info</a>
        </div>
        <div>
            <?php $lol = "/Shibboleth.sso/Logout?return=" . 'https://' . $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"]; ?>
            <p>Log out: <a href="<?php echo $lol; ?>"><?php echo $lol; ?></a>
        </div>

    <?php } else { ?>

        <div id="idpSelect"></div>


        <script src="idpselect_config.js" type="text/javascript" language="javascript"></script>
        <script src="idpselect.js" type="text/javascript" language="javascript"></script>

        <script src="idps_prepare.js" type="text/javascript" language="javascript"></script>

        <script>
            if (idps_prepare()) {
                (new IdPSelectUI()).draw(new IdPSelectUIParms());
            }
        </script>

    <?php } ?>
    <pre>
<?php print_r($_SERVER); ?>
</pre>
</body>

</html>