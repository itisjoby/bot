
class BotEditor {
    constructor() {
        var data=[{
            id:1,
            type:'message',
            content:'helo world',
            parentid:false,
          },{
            id:2,
            type:'message',
            content:'hellllllo world',
            parentid:1,
          }
        ];

    this.data  = data;
    this.root_element=$('.demo_area');
    this.currently_editing=false;
    this.currently_editing_data=false;
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


    
    prepare_editing(id){
        for(let obj of this.data){
            if(obj.id==id){
                this.currently_editing=true;
                this.currently_editing_data=obj;
                if(obj.type=='message'){
                    this._edit_message(obj);
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
                id:parseFloat(from_id)+1,
                    type:'message',
                    content:'hello world',
                    parentid:parseFloat(from_id),
            };
            this.data.push(new_obj);
            this.refresh();
            
        }else if(added_option=='buttons'){
            let new_obj={
                id:parseFloat(from_id)+1,
                    type:'buttons',
                    content:'how is today?',
                    parentid:parseFloat(from_id),
            };
            this.data.push(new_obj);
            let new_btn_obj={
                id:parseFloat(from_id)+1,
                    type:'button',
                    content:'good',
                    parentid:parseFloat(new_obj.id),
                    btn_label:'good',
                    btn_redirect_url:'',
                    btn_variable:'',
                    btn_colour:'',
                    btn_bgcolour:'',
                    btn_css:''

            };
            this.data.push(new_btn_obj);
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
            }
        }    
    }

    _add_button_group(obj){
        let self=this;
        let message_html=`<div class="block button_box" opt="buttons"  id="block_${obj.id}">
        ${obj.content}
           <i class="configure_btn fa-solid fa-gears"></i>
        </div>`;
        this.root_element.append(message_html);
       
        $(`div#block_${obj.id}`).on('click','.configure_btn',function(){
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
        $(`div#block_${obj.id}`).on('click','.configure_btn',function(){
           self.prepare_editing(obj.id);
        });
        $(`div#block_${obj.id}`).on('click','.true_case',function(){
            self.show_next_options(obj.id);
         });
       
    }
}




