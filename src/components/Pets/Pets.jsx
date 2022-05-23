import Title from '../Title/Title';
import ListPets from './ListPets';
import { pawprints } from '../../assets/img.jsx';

export default function Tags() {
    const component = "Pets";

    return (
        <section className="pets mt-5">
            <div className="container" >
                <div className="card cstm-card border-primary">
                    <div className="card-header bg-primary text-white">
                        <div className="row">
                            <div className="col-md-11">
                                <Title title={component} size="h1"/>
                            </div>
                            <div className="col-md-1">
                                <img src={pawprints} alt="pawprints" className="cstm-img float-right" />
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        <ListPets component={component} />
                    </div>
                </div>
            </div>
        </section>
    )
}