import React, {useState}  from 'react'

function About(props) {
    const [count, setCount] = useState(1)
    return <div>
        <h1>hello {props.title}! {count}</h1>
        <button onClick={()=>setCount(count+1)}>count</button>
    </div>
    
}

export default About;