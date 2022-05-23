import Title from '../Title/Title';
import ListPets from './ListPets';

export default function Tags() {
    const component = "Pets";

    return (
        <section className="pets mt-5">
            <div className="container" >
                <div className="card">
                    <div className="card-header">
                        <Title title={component} size="h1"/>
                    </div>

                    <div className="card-body">
                        <ListPets component={component} />
                    </div>
                </div>
            </div>
        </section>
    )
}