/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function(){
   
    let bot=new BotEditor();
   
    bot.refresh();
    
    
    $(".true_case").on('click',function(){
        $(".add_choice").show();
    });
    $(".remove_choice").on('click',function(){
        $(".add_choice").hide();
    });
    
    $(".actual_block").hover(function () {
                    $('.optioncontainer').show('slow');
                }, function () {


                    setTimeout(function () {
                        if (!($('.actual_block:hover').length > 0))
                            $('.optioncontainer').hide('slow');
                    }, 200);

                });
})

function addWelcomeContent(){
    let message_block_copy=$(".message_block").clone();
    $(".welcome_block").html(message_block_copy).find(".message_block").show();
}