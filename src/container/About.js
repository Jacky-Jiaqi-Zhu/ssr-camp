import React, {useState}  from 'react'
import styles from './About.css'

function About(props) {
    const [count, setCount] = useState(1)
    return <div>
        <h1 className={styles.title}>hello {props.title}! {count}</h1>
        <button onClick={()=>setCount(count+1)}>count</button>
    </div>
    
}

export default About;