import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Title from '../Title/Title';

const endpoint = 'https://pets.diegochavez-dc.com/api';

export default function FormPets(props) {
	const [name, setName] = useState('');
	const [photo, setPhoto] = useState('');
	const [status, setStatus] = useState('');
	const [categories, setCategories] = useState([]);
	const [valueCategory, setValueCategory] = useState('');
	const [valueTag, setValueTag] = useState('');
	const [tags, setTags] = useState([]);
	const navigate = useNavigate();
	const { id } = useParams();
	const MySwal = withReactContent(Swal);
	let StatusPeticion = '';
	let StatusInternal = '';

	const getAllCategories = async () => {
		try {
			const response = await axios.get(`${endpoint}/categories`);
			setCategories(response.data.data);
		} catch (error) {
			StatusPeticion = 'Status: ' + error.response.status;
			Notifications(
				'error',
				'error',
				'Error',
				'Unable to obtain records.',
				StatusPeticion
			);
		}
	};

	const getAllTags = async () => {
		try {
			const response = await axios.get(`${endpoint}/tags`);
			setTags(response.data.data);
		} catch (error) {
			StatusPeticion = 'Status: ' + error.response.status;
			Notifications(
				'error',
				'error',
				'Error',
				'Unable to obtain records.',
				StatusPeticion
			);
		}
	};

	const addPet = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${endpoint}/pet`, {
				name: name,
				category_fk: valueCategory,
				tag_fk: valueTag,
				photoUrls: photo,
				status: status,
			});
			StatusInternal = response.data.status;
			StatusPeticion = 'Status: ' + StatusInternal;
			if (StatusInternal === 200) {
				Back();
				Notifications(
					'success',
					'success',
					'Registered',
					'Pet added successfully',
					StatusPeticion
				);
			}
			if (StatusInternal === 405) {
				Notifications(
					'error',
					'error',
					'Validation',
					'Validation exception',
					StatusPeticion
				);
			}
		} catch (error) {
			StatusPeticion = 'Status: ' + error.response.status;
			Notifications(
				'error',
				'error',
				'Error',
				'Failed to registrered record',
				StatusPeticion
			);
		}
	};

	const updatePet = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(`${endpoint}/pet`, {
				id: id,
				name: name,
				category_fk: valueCategory,
				tag_fk: valueTag,
				photoUrls: photo,
				status: status,
			});
			StatusInternal = response.data.status;
			StatusPeticion = 'Status: ' + StatusInternal;
			if (StatusInternal === 200) {
				Back();
				Notifications(
					'success',
					'success',
					'Updated',
					'Pet update successfully',
					StatusPeticion
				);
			}
			if (StatusInternal === 405) {
				Notifications(
					'error',
					'error',
					'Validation',
					'Validation exception',
					StatusPeticion
				);
			}
		} catch (error) {
			StatusPeticion = 'Status: ' + error.response.status;
			Notifications(
				'error',
				'error',
				'Error',
				'Failed to updated record',
				StatusPeticion
			);
		}
	};

	const Notifications = (type, icon, title, text, footer) => {
		MySwal.fire({
			type: type,
			title: title,
			icon: icon,
			text: text,
			footer: footer,
			ConfirmButton: confirm,
			confirmButtonColor: '#0D6EFD',
			confirmButtonText: 'Ok',
		});
	};

	const Back = () => {
		navigate('/pets');
	};

	useEffect(() => {
		const fetchData = async () => {
			if (props.opc === 'add') {
				await getAllCategories();
				await getAllTags();
			}
			if (props.opc === 'edit') {
				try {
					const response = await axios.get(`${endpoint}/pet/${id}`);
					setName(response.data.data.name);
					setValueCategory(response.data.data.category_fk);
					setValueTag(response.data.data.tag_fk);
					setStatus(response.data.data.status);
					await getAllCategories();
					await getAllTags();
				} catch (error) {
					StatusPeticion = 'Status: ' + error.response.status;
					Notifications(
						'error',
						'error',
						'Error',
						'Unable to obtain pet information.',
						StatusPeticion
					);
				}
			}
		};

		fetchData();
	}, [id, props.opc]);

	return (
		<div className="container">
			<div className="cstm-card card-form card mt-5 mb-5 border-primary">
				<div className="card-header bg-primary text-white">
					<div className="row">
						<div className="col-sm-1 col-md-1 col-lg-1">
							<button
								onClick={Back}
								className="btn btn-secondary"
							>
								<i className="fa-solid fa-backward"></i>
							</button>
						</div>

						<div className="col-sm-10 col-md-10 col-lg-10">
							<Title
								title={
									props.opc === 'edit'
										? 'Edit Pet'
										: 'New Pet'
								}
								size="h3"
							/>
						</div>
					</div>
				</div>
				<div className="card-body">
					<form onSubmit={props.opc === 'edit' ? updatePet : addPet}>
						<div className="row">
							<div className="col-sm-12 col-md-12 col-lg-12">
								<div className="mb-3">
									<input
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
										type="text"
										className="form-control"
										placeholder="Name"
									/>
								</div>
								<div className="mb-3">
									<select
										className="form-select"
										onChange={(e) =>
											setValueCategory(e.target.value)
										}
									>
										<option value="">
											Select a category
										</option>
										{categories.map((category) => (
											<option
												key={category.id}
												value={category.id}
												selected={
													category.id ===
													valueCategory
												}
											>
												{category.name}
											</option>
										))}
									</select>
								</div>
								<div className="mb-3">
									<select
										className="form-select"
										onChange={(e) =>
											setValueTag(e.target.value)
										}
									>
										<option value="">Select a Tag</option>
										{tags.map((tag) => (
											<option
												key={tag.id}
												value={tag.id}
												selected={tag.id === valueTag}
											>
												{tag.name}
											</option>
										))}
									</select>
								</div>
								<div className="mb-3">
									<input
										type="file"
										className="form-control"
										value={photo}
										onChange={(e) =>
											setPhoto(e.target.value)
										}
									/>
								</div>
								<div className="mb-3">
									<select
										className="form-select"
										onChange={(e) =>
											setStatus(e.target.value)
										}
									>
										<option value="">
											Select a status
										</option>
										<option
											value="available"
											selected={status === 'available'}
										>
											Available
										</option>
										<option
											value="pending"
											selected={status === 'pending'}
										>
											Pending
										</option>
										<option
											value="sold"
											selected={status === 'sold'}
										>
											Sold
										</option>
									</select>
								</div>
							</div>
						</div>
						<button type="submit" className="btn btn-primary">
							{props.opc === 'edit' ? 'Update' : 'Save'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
