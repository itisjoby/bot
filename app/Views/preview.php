<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Bot </title>
        <meta name="description" content="The small framework with powerful features">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" type="image/png" href="/favicon.ico"/>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <link href="<?php echo base_url('assets/style.css'); ?>" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    </head>
    <body>
        <div class="bot_display">
            </div>

        <script src="<?php echo base_url('assets/Bot.js'); ?>"></script>
       
        



        <script type="text/javascript">
            $(document).ready(function () {
                let bot=new Bot();
                bot.start();

            });
        </script>
    </body>
</html>
