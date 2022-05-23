import Title from '../Title/Title';
import ListTags from './ListTags';

export default function Tags() {

    const component = "Tags";

    return (
        <section className="categories mt-5">
            <div className="container" >
                <div className="card">
                    <div className="card-header">
                        <Title title={component} size="h1"/>
                    </div>
                    <div className="card-body">
                        <ListTags component={component} />
                    </div>
                </div>
            </div>
        </section>
    )
}