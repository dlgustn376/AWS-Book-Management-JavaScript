import React from 'react';

const PromiseStudy = () => {

    const a = new Promise((resolve,reject)=>{   // 콜백이 필요한 상황이기 때문에 Promise를 사용
        console.log("프로미스 호출");
        
        if(1 === 1){
            resolve();     // resolve가 호출이 되면, 정상적인 return이 성공했을 때.
        } else {
            throw new Error("오류입니다.");
        }
    });

    const clickHandler = () =>{
        a.then(()=>{
            console.log("1번 then 호출");
            return new Promise((resolve, reject)=> {
                resolve("리턴!!!");
            });
        }).catch((error) => {
            console.log(error);
        })
        .then(b)
        // .finally(console.log("finally 실행"));
    }

    const b = (str) =>{
        console.log(str);
    }


    return (
        <div>
            <button onClick={clickHandler}>버튼</button>
        </div>
    );
};

export default PromiseStudy;