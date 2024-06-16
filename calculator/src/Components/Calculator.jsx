import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Calculator() {



    const[result, setResult] = useState('')
    const [expresion, setExpresion] = useState('')
    const [history, setHistory] = useState([])


    

    const [history_block_class, setHistoryBlockClass] = useState('history-block hidden')
    const [count, setCount] = useState(0)
    const evaluate=()=>{
        try{
            let res= eval(expresion)
            setResult(res)
            
            let newData = `${expresion} = ${res}`
            // setHistory([...history,expresion+" = "+res])
            
            let updateHistory = [...history,newData]
            if(updateHistory.length > 10){
                console.log(updateHistory)
                console.log(updateHistory.shift())
            }
                // setHistory([...history,newData])
                setHistory(updateHistory)

                setCount(prev=>prev+1)

            
                axios.post('http://localhost:8082/storehistory',{data:newData})
                .then(response=>{
                    console.log(response)
                })
                .catch(err=>{
                    console.log(err)
                })   
        }
        catch(err){
            setResult('Invalid')
        }
    }

    

    const [historyList, setHistoryList] = useState([])
    const [length, setLength] = useState('')
    useEffect(()=>{
        fetch('http://localhost:8082/gethistory')
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
            setHistoryList(data)
            setLength(data.length)
            console.log(data.length)
        })
        .catch(err=>console.log(err))
    },[])

    // useEffect(()=>{
    //     const interval = setInterval(()=>{
    //         setHistory([])
    //         // axios.delete('http://localhost:8082/deletehistory')
    //         // .then((response)=>console.log(response))
    //         // .catch((err)=>console.log(err))
    //     },120000)

    //     return 
    // },[])

  return (
    <>
    <div className="calculator">
        <header>
            <h1>CALCULATOR</h1>
        </header>
        
            <div className="calculator-block">
                
                <div className="result-block" >
                    <p style={{fontSize:'20px'}}>{expresion}</p>
                    <br /><br />
                    <h1>{result}</h1>
                </div>
               
                <br />
                <div className="button-block">
                    <table>
                        <tr >
                            <td><button value='7' onClick={e=>setExpresion(expresion+(e.target.value))}>7</button></td>
                            <td><button value='8' onClick={e=>setExpresion(expresion+(e.target.value))}>8</button></td>
                            <td><button value='9' onClick={e=>setExpresion(expresion+(e.target.value))}>9</button></td>
                            <td><button onClick={e=>{setExpresion(expresion.slice(0,expresion.length-1))}}>DEL</button></td>
                        </tr>
                        <tr>
                            <td><button value='4' onClick={e=>setExpresion(expresion+(e.target.value))}>4</button></td>
                            <td><button value='5' onClick={e=>setExpresion(expresion+(e.target.value))}>5</button></td>
                            <td><button value='6' onClick={e=>setExpresion(expresion+(e.target.value))}>6</button></td>
                            <td><button value='-' onClick={e=>setExpresion(expresion+(e.target.value))}>-</button></td>
                        </tr>
                        <tr>
                            <td><button value='1' onClick={e=>setExpresion(expresion+(e.target.value))}>1</button></td>
                            <td><button value='2' onClick={e=>setExpresion(expresion+(e.target.value))}>2</button></td>
                            <td><button value='3' onClick={e=>setExpresion(expresion+(e.target.value))}>3</button></td>
                            <td><button value='+' onClick={e=>setExpresion(expresion+(e.target.value))}>+</button></td>
                        </tr>
                        <tr>
                            <td><button value='.' onClick={e=>setExpresion(expresion+(e.target.value))}>.</button></td>
                            <td><button value='0' onClick={e=>setExpresion(expresion+(e.target.value))}>0</button></td>
                            <td><button value='/' onClick={e=>setExpresion(expresion+(e.target.value))}>/</button></td>
                            <td><button value='*' onClick={e=>setExpresion(expresion+(e.target.value))}>*</button></td>
                        </tr>
                        <tr>
                            <td colSpan='2'><button onClick={e=>{setExpresion('');setResult('')}}>CLEAR</button></td>
                            <td colSpan='2'><button value='=' onClick={evaluate} >=</button></td>
                            
                        </tr>

                    </table>
                    <button id='history-btn' onClick={e=>setHistoryBlockClass('history-block visible')}>History</button>
                    
                </div>
            </div>

            
        </div>
    

        <div className={history_block_class}>
            <i class="fa-solid fa-x" onClick={e=>setHistoryBlockClass('history-block hidden')}></i>
            <div className='history-data'>
            {history.map((item,i)=>(
                <li>{item}<br/><br/></li> 
            ))}
            </div>
        </div>

        {
            historyList.map((item,i)=>(
                <li>{item.data}</li>
            ))
        }
    </>
  )
}

export default Calculator