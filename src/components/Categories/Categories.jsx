import Title from '../Title/Title';
import ListCategories from './ListCategories';
import './Categories.css';

export default function Categories() {

    const component = "Categories";

    return (
        <section className="categories mt-5">
            <div className="container" >
                <div className="card">
                    <div className="card-header">
                        <Title title={component} size="h1"/>
                    </div>
                    <div className="card-body">
                        <ListCategories component={component} />
                    </div>
                </div>
            </div>
        </section>
    )
}