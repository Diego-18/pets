export default function Title(props) {
    if (props.size === 'h1') {
        return <h1 className="card-label">{props.title}</h1>
    } else if (props.size === 'h2') {
        return <h2 className="card-label">{props.title}</h2>
    } else if (props.size === 'h3') {
        return <h3 className="card-label">{props.title}</h3>
    } else if (props.size === 'h4') {
        return <h4 className="card-label">{props.title}</h4>
    } else if (props.size === 'h5') {
        return <h5 className="card-label">{props.title}</h5>
    } else if (props.size === 'h6') {
        return <h6 className="card-label">{props.title}</h6>
    }
}