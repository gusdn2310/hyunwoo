import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';
//useMemo는 함수값은 기억 useCallback은 함수 자체를 기억
function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lottoh = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);//값을 기억하기
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]); //hooks는 조건문 함수나 반복문에도 넣지 말기

  useEffect(() => {
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행
  //실행한다 timeouts이 바뀔때

  useEffect(() => {
    console.log('로또 숫자를 생성합니다.');
  }, [winNumbers]);// 여러번 써도 된다.

  /*const mounted = useRef(false);
  useEffect(()=>{
    if(!mounted.currunt){
        mounted.current = true;
    }else{

    }
  },[바뀌는값]); componentDidUpdate만 실행*/

  const onClickRedo = useCallback(() => {
    console.log('onClickRedo');
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);//함수자체를 기억 

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} onClick={onClickRedo} />}{/*이럴경우 useCallback 자식 리렌더링 막기*/ }
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

export default Lottoh;