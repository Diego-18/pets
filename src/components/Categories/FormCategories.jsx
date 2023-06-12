import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Title from '../Title/Title';

const endpoint = 'https://pets.diegochavez-dc.com/api/category';

export default function FormCategories(props) {
	const [name, setName] = useState('');
	const navigate = useNavigate();
	const { id } = useParams();
	const MySwal = withReactContent(Swal);

	const addCategory = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(endpoint, { name: name });
			if (response.data.status === 200) {
				Back();
				Notifications(
					'success',
					'success',
					'Registered',
					'Category added successfully',
					'Status: 200'
				);
			} else if (response.data.status === 405) {
				Notifications(
					'error',
					'error',
					'Validation',
					'Validation exception',
					'Status: 405'
				);
			}
		} catch (error) {
			Notifications(
				'error',
				'error',
				'Error',
				'Failed to register record',
				`Status: ${error.response.status}`
			);
		}
	};

	const updateCategory = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(`${endpoint}/${id}`, {
				name: name,
			});
			if (response.data.status === 200) {
				Notifications(
					'success',
					'success',
					'Updated',
					'Category updated successfully',
					'Status: 200'
				);
				Back();
			} else if (response.data.status === 405) {
				Notifications(
					'error',
					'error',
					'Validation',
					'Validation exception',
					'Status: 405'
				);
			}
		} catch (error) {
			Notifications(
				'error',
				'error',
				'Error',
				'Failed to update record',
				`Status: ${error.response.status}`
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
			confirmButtonColor: '#0D6EFD',
			confirmButtonText: 'Ok',
		});
	};

	const Back = () => {
		navigate('/categories');
	};

	useEffect(() => {
		if (props.opc === 'edit') {
			const getCategoryById = async () => {
				try {
					const response = await axios.get(`${endpoint}/${id}`);
					setName(response.data.data[0].name);
				} catch (error) {
					Notifications(
						'error',
						'error',
						'Error',
						'Failed to fetch category',
						`Status: ${error.response.status}`
					);
				}
			};
			getCategoryById();
		}
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
										? 'Edit Category'
										: 'New Category'
								}
								size="h3"
							/>
						</div>
					</div>
				</div>
				<div className="card-body">
					<form
						onSubmit={
							props.opc === 'edit' ? updateCategory : addCategory
						}
					>
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
