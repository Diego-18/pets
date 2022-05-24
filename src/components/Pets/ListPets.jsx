import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Title/Title";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const endpoint = "https://pets.diegochavez-dc.com/api";

export default function ListPets(props) {
	const [pets, setPets] = useState([]);
	const navigate = useNavigate()
	const MySwal = withReactContent(Swal);

	const getStatusPets = async (param) => {
		const response = await axios({method: "get", url: "https://pets.diegochavez-dc.com/api/pet/findByStatus", params: { status: param } })
		setPets(response.data.data);
	}

	const deletePet = async id => {
		MySwal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
			confirmButtonColor: '#0D6EFD',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
			if (result.isConfirmed) {
				axios.delete(`${endpoint}/pet/${id}`);
				Swal.fire('Deleted!','Your file has been deleted.','success')
				navigate("/")
			}
		})
	};

	return (
		<div className="container text-center">
			<div className="d-grid gap-2 d-md-block m-2">
                <button className="btn btn-outline-primary m-2" type="button" onClick={ () => getStatusPets('available') }>Available</button>
                <button className="btn btn-outline-primary m-2" type="button" onClick={ () => getStatusPets('pending')}>Pending</button>
                <button className="btn btn-outline-primary m-2" type="button" onClick={ () => getStatusPets('sold')}>Sold</button>

				<div className="btn-new">
					<Link to="/pet" className="btn btn-success mt-3 mb-3">
						<i className="fa fa-plus" aria-hidden="true" />
					</Link>
				</div>
            </div>

			<div className="cstm-pets">
				<div className="row">
					{pets.map((pet, index) => (
					<div className="col-sm-6 mb-2" key={index}>
						<div key={pet.id} className="card m-2 border-primary">
							<div className="card-header bg-primary text-white">
								<h4>Pets ID: {pet.id}</h4>
							</div>
							<div className="card-body">
								<Title title={pet.name} size="h3" />
								<p className="card-text">Category: {pet.category_name}</p>
								<p className="card-text">Tag: {pet.tag_name}</p>
								<p className="card-text">Status: {pet.status}</p>
							</div>
							<div className="card-footer">
								<Link to={`/pet/${pet.id}`} className="btn btn-primary">
									<i className="fa fa-pen" aria-hidden="true" />
								</Link>
								<button
									onClick={() => deletePet(pet.id)}
									className="btn btn-danger m-2"
								>
									<i className="fa fa-trash" aria-hidden="true" />
								</button>
							</div>
						</div>
					</div>
				))}
				</div>
			</div>
		</div>
	);
}
