
class Bot {
    constructor() {
        var data = localStorage.getItem('bot_editor_data');
        if(data==null){
           alert("no data")
        }else{
            data=JSON.parse(data);
        }
        
       
    this.data  = data;
    this.variables=[];
    this.root_element=$('.bot_display');
    this.last_executed_id=false;
    this.looping_array=JSON.parse(JSON.stringify(this.data));//structuredClone(this.data)//no browser support
   
  }
  harvest_variables(){
    for(let data of this.data){
        if(data.type=='buttons'){
            let obj={
                variable_name:data.variable_name,
                id:data.id
            };
            this.variables.push(obj);
        }else if(data.type=='question'){
            let obj={
                variable_name:data.variable_name,
                id:data.id
            };
            this.variables.push(obj);
        }
    }
  }
  start(){
    
    this.root_element.html('');
    let self=this;
    
    self.harvest_variables();

    $(document).on('response_from_user',function(e,param){
        console.log(self.data)
        for(let index in self.looping_array){
            self.looping_array=JSON.parse(JSON.stringify(self.looping_array));

            let obj=self.looping_array[index];
            
            if (index > -1) { // only splice array when item is found
              
                self.looping_array.splice(index, 1); // 2nd parameter means remove one item only
               
            }
            self.looping_array=JSON.parse(JSON.stringify(self.looping_array));
        
          
            if(obj.type=='message'){
                let message_wrapper=`<div class="message_wrapper_${obj.id}"></div>`;
                self.root_element.append(message_wrapper);
                let new_message=new Promise(function(resolve,reject){
                    self.typing(obj,resolve,reject);
                });
                new_message.then(function(value){
                    self._add_message(obj);
                    $(document).trigger('response_from_user',[48]);
                    return false;
                });
                return false;
            }else if(obj.type=='buttons'){
                self._add_button_group(obj);
                $(document).trigger('response_from_user',[54]);
                return false;
            }else if(obj.type=='button'){
                self._add_button(obj);
               
                let siblings=self.get_siblings(obj.parentid,obj.id,'button');
              
                if(siblings.length>0){
                    $(document).trigger('response_from_user',[54]);
                return false;
                }else{
                   
                    return false;
                }
               
            }else if(obj.type=='question'){
                self._add_question(obj);
                $(document).trigger('response_from_user',[54]);
                return false;
            }else if(obj.type=='answer'){
                self._add_answer(obj);
               
                return false;
            }
        }
    });
    $(document).trigger('response_from_user',[72]);
        
  }
 
  get_siblings(parentid,id,type=''){
    let available_siblings=[];
    for(let data of this.looping_array){
      
        if(data.parentid==parentid && data.id!=id){
           
            if(type!='' && type!=data.type){
               continue;
            }
           
            available_siblings.push(data);
         }
    }
    return available_siblings;
  }
  typing(obj,resolve,reject){
    $(`.message_wrapper_${obj.id}`).html('typing...');
    
    let delay=Math.round(obj.content.length*100/3);
    if(delay<1500){
        delay=1500;
    }
    setTimeout(function(){
        resolve();
    }, delay);
  }

  _add_message(obj){
    let message_html=`<div class="block message_box" opt="message"  id="block_${obj.id}">
    ${obj.content}
    </div>`;
    $(`.message_wrapper_${obj.id}`).html(message_html);
    
  }
  _add_question(obj){
    let message_html=`<div class="block question_box" opt="question"  id="block_${obj.id}">
    ${obj.content}
    </div>`;
    this.root_element.append(message_html);
    
  }
  _add_answer(obj){
    let self=this;
    let message_html=`<div class="block answer_box" opt="answer"  id="block_${obj.id}">
    <input type="text" value="" placeholder="${obj.placeholder}"/>
    </div>`;
    this.root_element.append(message_html);
    $(`div#block_${obj.id} input[type=text]`).on('keydown', function(e) {
        if (e.which == 13) {
            e.preventDefault();
            for(let data of self.data){
                if(data.id==obj.parentid){
                    data.variable_value=$(this).val();;
                }
            }
            $(document).trigger('response_from_user',[54]);
        }
    });
    
  }

  _add_button_group(obj){
    let self=this;
    let message_html=`<div class="block button_box" opt="buttons"  id="block_${obj.id}">
    ${obj.content}
    </div>`;
    this.root_element.append(message_html);
   
   
}
_add_button(obj){
    let self=this;
    let message_html=`<div class="block button_item" opt="button"  id="block_${obj.id}">
    <span class="button_span">${obj.btn_label}</span>
    
    </div>`;
    $(`div#block_${obj.parentid}`).append(message_html);
    $(`div#block_${obj.parentid}`).on('click',`#block_${obj.id}`,function(){

        for(let data of self.data){
            if(data.id==obj.parentid){
                data.variable_value=obj.content;
            }
        }
       
        //get ids folowing parent of me
        //get obj follow these ids 
        //remove them
        let ids_to_eliminate=[];
       
        for(let data of self.data){
            if(data.parentid==obj.parentid && data.id!=obj.id){
               
                ids_to_eliminate.push(data.id); 
            }
        }
        
        for(let index in self.looping_array){
            let data=self.looping_array[index];
            if(ids_to_eliminate.includes(data.parentid)){
               
                self.looping_array.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
       
        $(document).trigger('response_from_user');
    });
   
   
}


}




