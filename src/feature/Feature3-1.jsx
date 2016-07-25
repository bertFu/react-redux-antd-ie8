// 含有可操作 table 栏的数据展示
import React from 'react';

import Immutable from 'immutable';
import TinyMCE from 'react-tinymce';
//https://github.com/ded/reqwest
import Reqwest from 'reqwest';

const Feature = React.createClass({
    getInitialState: function(){
        return {
            value: ''
        }
    },
    render: function() {
        let config = {
            content: "<p>This is the initial content of the editor</p>",
            config: {
                height: '250',
                plugins: [
                    "advlist autolink lists charmap print preview hr anchor pagebreak spellchecker",
                    "searchreplace wordcount visualblocks visualchars fullscreen insertdatetime  nonbreaking",
                    "save table contextmenu directionality emoticons paste textcolor"
                ],
                toolbar: "insertfile undo redo | styleselect fontselect fontsizeselect| bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      | print preview fullpage | forecolor backcolor", 
            },
            onChange: this.handleEditorChange
        }
        return  <div>
            <p style={{margin:'10px'}}>html文本：{this.state.value}</p>
            <TinyMCE className="editor" {...config} />
        </div>
    },

    handleEditorChange(e) {
        window.e = e;
        this.setState({
            value: e.target.getContent()
        });
    },
});

export default Feature;
