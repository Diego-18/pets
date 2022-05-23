import './Home.css';
import { pawprint } from '../../assets/img';

export default function Home() {
    return (
        <section className="Home">
            <div className="container mt-5 text-center">
                <h1 className="logo cstm-title">PETS</h1>
                <p className="mt-5">
                    This is an application to manage pets.
                </p>
                <p>
                    It allows to create, delete and edit pets, besides being able to define them with categories and tags for better filtering.
                </p>
                <p>
                    It also allows filtering by their status: available, pending and sold (in case they are needed).
                </p>

                <img src={pawprint} alt="pawprint" className="pawprint" />
            </div>
        </section>
    )
}