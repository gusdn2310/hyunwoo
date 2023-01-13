import React, {Component,createRef} from 'react';
import Try from './Try';

function getNumbers(){//숫자 네개를 겹치지않고 뽑기
    const candidate=[1,2,3,4,5,6,7,8,9];
    const array=[];
    for(let i =0; i<4 ;i+=1){
        const chosen = candidate.splice(Math.floor(Math.random()*(9-i)),1)[0];
        array.push(chosen);
    }
    return array;
}
class NumberBaseball extends Component{
        state={
            result:'',
            value:'',
            answer:getNumbers(),
            tries: [],
        }
        onSubmitForm = (e) =>{
            /*const {result, value,tries}=this.state; this.state를 뺸다*/
            e.preventDefault();
            if(this.state.value === this.state.answer.join('')){
                this.setState((prevState) => {
                    return{
                    result:'홈런',
                    tries:[...prevState.tries,{try:this.state.value, result:'홈런!'}],
                    };
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value:'',
                    answer: getNumbers(),
                    tries:[],
                });
            }else{//답틀렸으면
                const answerArray = this.state.value.split('').map((v) => parseInt(v));
                let strike = 0;
                let ball = 0;
                if(this.state.tries.length>=9){//10번 이상 틀렸을때
                    this.setState({
                    result:`10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}였습니다!`,
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value:'',
                    answer: getNumbers(),
                    tries:[],
                });
                this.inputref.current.focus();
            }else{
                for(let i =0;i<4; i+=1){
                    if(answerArray[i]===this.state.answer[i]){
                        strike +=1;   
                    }else if(this.state.answer.includes(answerArray[i])){
                        ball+=1;
                    }
                }
                this.setState((prevState) =>{
                    return{
                    tries:[...prevState.tries,{try:this.state.value, result:`${strike}스트라이크, ${ball}볼입니다`}],
                    value:'',
                    };
                });
                this.inputref.current.focus();
            }

        }
        };

        onChangeInput = (e) =>{
            console.log(this.state.answer);
            this.setState({
                value:e.target.value,
            });
        };
        inputref =createRef(); //생성
    

        render() {
            return(
            <>
            <h1>{this.state.result}</h1>
            <form onSubmit={this.onSubmitForm}>
                <input ref={this.inputRef}maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                <button>입력!</button>
            </form>
            <div>시도:{this.state.tries.length}</div>
            <ul>
                {this.state.tries.map((v,i)=> {
                    return(
                        <Try key={`${i+1}차 시도:`}tryInfo={v} />
                    );
                })}
            </ul>   
            </>
        );
            }
        
    }


/*export const hello = 'hello';//import{hello}
export const bye = 'hello';//import{hello, bye}*/

export default NumberBaseball;//import NumberBaseball;

//const React = require('react');
//exports.hello = 'hello';
// module.exports = NumberBaseball;  node