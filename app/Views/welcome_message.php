<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Bot maker</title>
        <meta name="description" content="The small framework with powerful features">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" type="image/png" href="/favicon.ico"/>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <link href="<?php echo base_url('assets/style.css'); ?>" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <!-- <script src="https://cdn.ckeditor.com/ckeditor5/34.2.0/classic/ckeditor.js"></script> -->
        <script src="<?php echo base_url('assets/ckeditor_mention.js'); ?>"></script>


    </head>
    <body>
        <div class="bot_container">
            <div class="demo_area" style="display:inline-block;width:50%"></div>
            <div class="configure_area" style="display:inline-block"></div>
        </div>
        <script src="<?php echo base_url('assets/Boteditor.js'); ?>"></script>
        <script src="<?php echo base_url('assets/app.js'); ?>"></script>
        
        <div class="logic_block" style="display:none">
            <label>if</label>
            <select>
                <option>variable1</option>
                <option>variable2</option>
                <option>custom value</option>
            </select>
            <label>condition</label>
            <select>
                <option>equals</option>
                <option>less than</option>
                <option>greater than</option>
                <option>less than equals</option>
                <option>greater than equals</option>
                <option>contains</option>
                <option>not contains</option>
            </select>
            <label>match</label>
            <select>
                <option>variable1</option>
                <option>variable2</option>
                <option>custom value</option>
            </select>
            <div class="add_more_logic">
                <label>more</label>
                <select>
                    <option>and</option>
                    <option>or</option>
                </select>
            </div>
            <div class="true_case">if true</div>
            <div class="false_case">if false</div>
        </div>
        <div class="optioncontainer" style="display:none">
            delete || edit || add
        </div>



        <script type="text/javascript">
            $(document).ready(function () {
                $(document).on('click', ".button_wrapper", function () {
                    if ($(this).hasClass("message_opt")) {
                        $(this).addClass('selected_grey');
                        $(".media_opt").removeClass("selected_grey");
                        $(".media_div").hide();
                        $(".message_div").show();
                    } else {
                        $(this).addClass('selected_grey');
                        $(".message_opt").removeClass("selected_grey");
                        $(".message_div").hide();
                        $(".media_div").show();
                    }
                });






            });
        </script>
    </body>
</html>
