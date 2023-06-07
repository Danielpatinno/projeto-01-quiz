interface TestProps {
    name:string
}

export function Test(props:TestProps){
    return (
        <h1>{props.name}</h1>
    )
}