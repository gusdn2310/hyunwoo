import React, {Component} from 'react';

class Try extends Component{
    /*constructor(props){
        super(props);
        const filterd = this.props.filter(()=> {

        });
            this.state ={
                result:filterd,
                try: this.props.try,
            } 
            
        }
    }*/
    state={
        result:this.props.result,
        try: this.props,
    }
    render(){
        return(
        <li>
        <div>{this.props.tryInfo.try}</div>
        <div>{this.props.tryInfo.result}</div>
        </li>
        );
    }
}

export default Try;