import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const endpoint = "https://pets.diegochavez-dc.com/api";

export default function ListTags(props) {
	const [tags, setTags] = useState([]);
	const MySwal = withReactContent(Swal);
	let status = "";

    useEffect(() => {
		getAllTags();
	}, []);

	const getAllTags = async () => {
		const response = await axios.get(`${endpoint}/tags`)
		.then(function(response){
			setTags(response.data.data);
		}).catch(
			function (error){
				status = 'Status: ' + error.response.status;
				Notifications('error', 'error', 'Error', 'Unable to obtain records.', status);
			}
		)
	};

	const deleteTag = async id => {
		const response = await axios.delete(`${endpoint}/tag/${id}`)
		.then(function(response){
			status = 'Status: ' + response.data.status;
			Notifications('success', 'success', 'Deleted', 'Tag deleted successfully.', status);
		}).catch(
			function (error){
				status = 'Status: ' + error.response.status;
				Notifications('error', 'error', 'Error', 'Failed to delete record', status);
			}
		)
		getAllTags();
	};

	const Notifications = (type, icon, title, text, footer) => {
        MySwal.fire({
            type: type,
            icon: icon,
            title: title,
			text: text,
            footer: footer,
            ConfirmButton: confirm,
            confirmButtonColor: '#0D6EFD',
            confirmButtonText: 'Ok'
        })
    }

	return (
		<div className="container text-center">
			<div className="btn-new">
				<Link to="/tag" className="btn btn-success mt-3 mb-3">
					<i className="fa fa-plus" aria-hidden="true" />
				</Link>
			</div>
			<table className="table table-striped caption-top align-middle">
                <caption>List of {props.component}</caption>
				<thead className="bg-primary text-white">
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Operations</th>
					</tr>
				</thead>
				<tbody>
					{tags.map(tag => (
						<tr key={tag.id}>
							<td> {tag.id} </td>
							<td> {tag.name} </td>
							<td>
								<Link
									to={`/tag/${tag.id}`}
									className="btn btn-warning m-3"
								>
									<i className="fa-solid fa-file-pen" />
								</Link>
								<button
									onClick={() => deleteTag(tag.id)}
									className="btn btn-danger"
								>
									<i
										className="fa fa-trash"
										aria-hidden="true"
									/>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
