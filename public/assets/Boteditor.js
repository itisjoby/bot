
class BotEditor {
    constructor() {
        var data = localStorage.getItem('bot_editor_data');
        if(data==null){
            var data=[{
                id:1,
                type:'message',
                content:'helo world',
                parentid:false,
              }
            ];
        }else{
            data=JSON.parse(data);
        }
        

    this.data  = data;
    this.root_element=$('.demo_area');
    this.currently_editing=false;
    this.currently_editing_data=false;
    this.latest_id=data.length+1;
  }


  
  _add_message(obj){
        let self=this;
        let message_html=`<div class="block message_box" opt="message"  id="block_${obj.id}">
            ${obj.content}
           <i class="configure_btn fa-solid fa-gears"></i>
            <div class="true_case"></div>
        </div>`;
        this.root_element.append(message_html);
        $(`div#block_${obj.id}`).on('click','.configure_btn',function(){
           self.prepare_editing(obj.id);
        });
        $(`div#block_${obj.id}`).on('click','.true_case',function(){
           self.show_next_options(obj.id);
        });
    }
    _edit_message(){
        let edit_html=`<div class="message_block" id="edit_block_${this.currently_editing_data.id}">
            <div class="message_div">
                <textarea id="message_input" placeholder="enter text">${this.currently_editing_data.content}</textarea>
            </div>
            <div class="media_div" style="display:none;min-height:150px;">
                <span>upload photos</span>
                <span>upload via http</span>
                <span>embeded video</span>
                <span>from giphy</span>
            </div>
            <div class="choose_type ">
                <span class="light_grey button_wrapper selected_grey message_opt">Message</span>
                <span class="light_grey button_wrapper media_opt">Media</span>
            </div>
            <button type="button" id="apply_change_${this.currently_editing_data.id}" >Apply</button>
        </div>`;
        $(".configure_area").html(edit_html);
        let self=this;
        $(`button#apply_change_${this.currently_editing_data.id}`).on('click',function(){
            let new_content=$(`#edit_block_${self.currently_editing_data.id} #message_input`).val();
            for(let obj of self.data){
                if(obj.id==self.currently_editing_data.id){
                    self.currently_editing=false;
                    self.currently_editing_data=false;
                    if(obj.type=='message'){
                        obj.content=new_content;
                    }
                }
            }   
            $(".configure_area").html('');
            self.refresh();
        });
    }

    _edit_buttons(){
       let edit_html=`<div class="button_block" id="edit_block_${this.currently_editing_data.id}">
       <label>Label</label>
       <input type="text" value="${this.currently_editing_data.content}" placeholder="label" name="btn_label">
       <br>
       <label>variable name</label>
                <input type="text" value="${this.currently_editing_data.variable_name}" placeholder="variable name" name="btn_variable">
                <br>
       <button type="button" id="add_button_${this.currently_editing_data.id}" >Add Button</button>
       <br>
       <button type="button" id="apply_change_${this.currently_editing_data.id}" >Apply</button>
       </div>`;
       $(".configure_area").html(edit_html);

       let self=this;


       $(`button#add_button_${self.currently_editing_data.id}`).on('click',function(){
        let new_btn_obj={
            id:parseFloat(self.latest_id),
                type:'button',
                content:'bad',
                parentid:parseFloat(self.currently_editing_data.id),
                btn_label:'bad',
                btn_redirect_url:'',
                btn_variable:'',
                btn_colour:'',
                btn_bgcolour:'',
                btn_css:''

        };
        self.latest_id++;
        self.data.push(new_btn_obj);
        self.refresh();
       });
       
       $(`button#apply_change_${self.currently_editing_data.id}`).on('click',function(){
           let btn_label=$(`#edit_block_${self.currently_editing_data.id} [name='btn_label']`).val();
           let btn_variable=$(`#edit_block_${self.currently_editing_data.id} [name='btn_variable']`).val();
            
           
           for(let obj of self.data){
             
               if(obj.id==self.currently_editing_data.id){
                   self.currently_editing=false;
                   self.currently_editing_data=false;
                 
                   if(obj.type=='buttons'){
                      
                       obj.content=btn_label;
                       obj.variable_name=btn_variable;
                   }
               }
           }   
          
           $(".configure_area").html('');
           self.refresh();
       });

    }
    _edit_button(){
       
        let edit_html=`<div class="button_block" id="edit_block_${this.currently_editing_data.id}">
                <label>Label</label>
                <input type="text" value="${this.currently_editing_data.btn_label}" placeholder="label" name="btn_label">
                <br>
                <label>Redirect Url</label>
                <input type="text" value="${this.currently_editing_data.btn_redirect_url}" placeholder="with http://" name="btn_redirect_url">
                <br>
                
                <label>colour</label>
                <input type="text" value="${this.currently_editing_data.btn_colour}" placeholder="colour" name="btn_colour">
                <br>
                <label>bg colour</label>
                <input type="text" value="${this.currently_editing_data.btn_bgcolour}" placeholder="bgcolour" name="btn_bgcolour">
                <br>
                <label>advanced css</label>
                <textarea name="btn_css">${this.currently_editing_data.btn_css}</textarea>
                <button type="button" id="apply_change_${this.currently_editing_data.id}" >Apply</button>
                </div>`;
        $(".configure_area").html(edit_html);
        let self=this;
       
        $(`button#apply_change_${self.currently_editing_data.id}`).on('click',function(){
            let btn_label=$(`#edit_block_${self.currently_editing_data.id} [name='btn_label']`).val();
            let btn_redirect_url=$(`#edit_block_${self.currently_editing_data.id} [name='btn_redirect_url']`).val();
            let btn_colour=$(`#edit_block_${self.currently_editing_data.id} [name='btn_colour']`).val();
            let btn_bgcolour=$(`#edit_block_${self.currently_editing_data.id} [name='btn_bgcolour']`).val();
            let btn_css=$(`#edit_block_${self.currently_editing_data.id} [name='btn_css']`).val();
           
            
            for(let obj of self.data){
              
                if(obj.id==self.currently_editing_data.id){
                    self.currently_editing=false;
                    self.currently_editing_data=false;
                  
                    if(obj.type=='button'){
                        obj.content=btn_label;
                        obj.btn_label=btn_label;
                        obj.btn_redirect_url=btn_redirect_url;
                       
                        obj.btn_colour=btn_colour;
                        obj.btn_bgcolour=btn_bgcolour;
                        obj.btn_css=btn_css;
                        
                    }
                }
            }   
           
            $(".configure_area").html('');
            self.refresh();
        });
    }


    _edit_question(){
        let edit_html=`<div class="question_block" id="edit_block_${this.currently_editing_data.id}">
                <label>question</label>
                <input type="text" value="${this.currently_editing_data.content}" place holder="label" name="question">
                <br>
                <label>Regex pattern for validation</label>
                <input type="text" value="${this.currently_editing_data.validation_regex}" place holder="with http://" name="validation_regex">
                <br>
                <label>variable name</label>
                <input type="text" value="${this.currently_editing_data.variable_name}" place holder="variable name" name="variable_name">
                <br>
                <label>validation error message</label>
                <input type="text" value="${this.currently_editing_data.validation_error_msg}" place holder="colour" name="validation_error_msg">
                <br>
                <label>answer type</label>
                <select name="answer_type">
                    <option value="text" ${(this.currently_editing_data.validation_error_msg=='text'?'selected':'')}>simple text answers</option>
                    <option value="multiple_choices" ${(this.currently_editing_data.validation_error_msg=='multiple_choices'?'selected':'')}>multiple choices</option>
                    <option value="single choice" ${(this.currently_editing_data.validation_error_msg=='choice'?'selected':'')}>single choice from list</option>
                </select>
        <button type="button" id="apply_change_${this.currently_editing_data.id}" >Apply</button>
        </div>`;
        $(".configure_area").html(edit_html);
 
        let self=this;
 
 
        
        
        $(`button#apply_change_${self.currently_editing_data.id}`).on('click',function(){
            let question=$(`#edit_block_${self.currently_editing_data.id} [name='question']`).val();
            let validation_regex=$(`#edit_block_${self.currently_editing_data.id} [name='validation_regex']`).val();
            let variable_name=$(`#edit_block_${self.currently_editing_data.id} [name='variable_name']`).val();
            let validation_error_msg=$(`#edit_block_${self.currently_editing_data.id} [name='validation_error_msg']`).val();
            let answer_type=$(`#edit_block_${self.currently_editing_data.id} [name='answer_type']`).val();
           
            
            for(let obj of self.data){
              
                if(obj.id==self.currently_editing_data.id){
                    self.currently_editing=false;
                    self.currently_editing_data=false;
                  
                    if(obj.type=='question'){
                       
                        obj.content=question;
                        obj.validation_regex=validation_regex;
                        obj.variable_name=variable_name;
                        obj.validation_error_msg=validation_error_msg;
                        obj.answer_type=answer_type;
                        
                    }
                }
            }   
           
            $(".configure_area").html('');
            self.refresh();
        });
 
     }
     _edit_answer(){
        let edit_html=`<div class="question_block" id="edit_block_${this.currently_editing_data.id}">
                <label>place holder</label>
                <input type="text" name="placeholder" value="${this.currently_editing_data.placeholder}" place holder="label" name="question">
                <br>
        <button type="button" id="apply_change_${this.currently_editing_data.id}" >Apply</button>
        </div>`;
        $(".configure_area").html(edit_html);
 
        let self=this;
 
 
        
        
        $(`button#apply_change_${self.currently_editing_data.id}`).on('click',function(){
            let placeholder=$(`#edit_block_${self.currently_editing_data.id} [name='placeholder']`).val();
            
            
            for(let obj of self.data){
              
                if(obj.id==self.currently_editing_data.id){
                    self.currently_editing=false;
                    self.currently_editing_data=false;
                  
                    if(obj.type=='answer'){
                       
                        obj.placeholder=placeholder;
                        
                    }
                }
            }   
           
            $(".configure_area").html('');
            self.refresh();
        });
 
     }
    
    prepare_editing(id){
       
        for(let obj of this.data){
            if(obj.id==id){
                this.currently_editing=true;
                this.currently_editing_data=obj;
                if(obj.type=='message'){
                    this._edit_message(obj);
                }else if(obj.type=='buttons'){
                    this._edit_buttons(obj);
                }else if(obj.type=='button'){
                    this._edit_button(obj);
                }else if(obj.type=='question'){
                    this._edit_question(obj);
                }else if(obj.type=='answer'){
                    this._edit_answer(obj);
                }
            }
        }   
    }

    show_next_options(from_id){
        let available_opts=`<div id="add_choice_${from_id}" >
            <label class="remove_choice">X</label>
            <select id="opt">
                <option value="text">add text</option>
                <option value="buttons">button group</option>
                <option value="question">question</option>
                <option value="logic">logic</option>
            </select>
            <button type="button" class="apply_btn">apply</button>
        </div>`;
        let self=this;
        $(available_opts).insertAfter("#block_"+from_id);
        $(`div#add_choice_${from_id}`).on('click','.remove_choice',function(){
            $(`div#add_choice_${from_id}`).remove();
        });
        $(`div#add_choice_${from_id}`).on('click','.apply_btn',function(){
            let added_option=$(`div#add_choice_${from_id}`).find('#opt').val();
            self.add_option(from_id,added_option);
            $(`div#add_choice_${from_id}`).remove();
        });
    }
    add_option(from_id,added_option){
        
        if(added_option=='text'){
            
            let new_obj={
                id:parseFloat(this.latest_id),
                    type:'message',
                    content:'hello world',
                    parentid:parseFloat(from_id),
            };
            this.data.push(new_obj);
            this.latest_id++;
            this.refresh();
            
        }else if(added_option=='buttons'){
            let new_obj={
                id:parseFloat(this.latest_id),
                    type:'buttons',
                    content:'how is today?',
                    parentid:parseFloat(from_id),
                    variable_name:'var_'+parseFloat(this.latest_id),
                    variable_value:'',
            };
            this.latest_id++;
            this.data.push(new_obj);
            let new_btn_obj={
                id:parseFloat(this.latest_id),
                    type:'button',
                    content:'good',
                    parentid:parseFloat(new_obj.id),
                    btn_label:'good',
                    btn_redirect_url:'',
                    btn_colour:'',
                    btn_bgcolour:'',
                    btn_css:''

            };
            this.latest_id++;
            this.data.push(new_btn_obj);
            this.refresh();
            
        }else if(added_option=='question'){
            
            let new_obj={
                id:parseFloat(this.latest_id),
                    type:'question',
                    content:'what is your name?',
                    parentid:parseFloat(from_id),
                    validation_regex:'',
                    variable_name:'var_'+parseFloat(this.latest_id),
                    variable_value:'',
                    validation_error_msg:'',
                    answer_type:'text',
            };
            this.data.push(new_obj);
            this.latest_id++;
            let new_obj2={
                id:parseFloat(this.latest_id),
                    type:'answer',
                    content:'what is your name?',
                    parentid:parseFloat(from_id),
                    answer_type:'text',
                    placeholder:'',
                    value:'',
                    parentid:parseFloat(new_obj.id),
            };
            this.data.push(new_obj2);
            this.latest_id++;
            this.refresh();
            
        }

        
    }

    refresh(){
        this.root_element.html('');
        for(let obj of this.data){
            if(obj.type=='message'){
                this._add_message(obj);
            }else if(obj.type=='buttons'){
                this._add_button_group(obj);
            }else if(obj.type=='button'){
                this._add_button(obj);
            }else if(obj.type=='question'){
                this._add_question(obj);
            }else if(obj.type=='answer'){
                this._add_answer(obj);
            }
        }    
        this.root_element.append('<button type="button" id="save_btn">Save</button><button type="button" id="clear_btn">Clear</button>');
        self=this;
        $(document).on('click','#save_btn',function(e){
            e.stopImmediatePropagation();
           self.save();
        });
        $(document).on('click','#clear_btn',function(e){
            e.stopImmediatePropagation();
           self.clear();
        });
    }
    save(){
        
        localStorage.setItem('bot_editor_data', JSON.stringify(this.data));
        console.log(this.data)
        alert("saved");

    }
    clear(){
        localStorage.clear();
        alert("cleared");
        location.reload();
    }

    _add_button_group(obj){
        let self=this;
        let message_html=`<div class="block button_box" opt="buttons"  id="block_${obj.id}">
        ${obj.content}
           <i class="configure_btn fa-solid fa-gears"></i>
        </div>`;
        this.root_element.append(message_html);
       
        $(`div#block_${obj.id}`).on('click','.configure_btn',function(e){
            e.stopImmediatePropagation();
           self.prepare_editing(obj.id);
        });
       
    }
    _add_button(obj){
        let self=this;
        let message_html=`<div class="block button_item" opt="button"  id="block_${obj.id}">
        <span class="button_span">${obj.btn_label}</span>
        
           <i class="configure_btn fa-solid fa-gears"></i>
           <div class="true_case"></div>
        </div>`;
        $(`div#block_${obj.parentid}`).append(message_html);
        $(`div#block_${obj.id}`).on('click','.configure_btn',function(e){
            e.stopImmediatePropagation();
           self.prepare_editing(obj.id);
        });
        $(`div#block_${obj.id}`).on('click','.true_case',function(e){
            e.stopImmediatePropagation();
            self.show_next_options(obj.id);
         });
       
    }

    _add_question(obj){
        let self=this;
        let message_html=`<div class="block button_item" opt="question"  id="block_${obj.id}">
        ${obj.content}
        
           <i class="configure_btn fa-solid fa-gears"></i>
           <div class="true_case"></div>
        </div>`;
        this.root_element.append(message_html);
        $(`div#block_${obj.id}`).on('click','.configure_btn',function(e){
            e.stopImmediatePropagation();
           self.prepare_editing(obj.id);
        });
        $(`div#block_${obj.id}`).on('click','.true_case',function(e){
            e.stopImmediatePropagation();
            self.show_next_options(obj.id);
         });
    }
    _add_answer(obj){
        let self=this;
        let message_html=`<div class="block answer_item" opt="question"  id="block_${obj.id}">
       
        <input type="text" value="" placeholder="${obj.placeholder}"/>
           <i class="configure_btn fa-solid fa-gears"></i>
          
        </div>`;
        $(`div#block_${obj.parentid}`).append(message_html);
        $(`div#block_${obj.id}`).on('click','.configure_btn',function(e){
            e.stopImmediatePropagation();
           self.prepare_editing(obj.id);
        });
        
       
    }
}




