import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../Title/Title";

const endpoint = 'http://localhost:8000/api'

export default function FormPets(props){
    const [name, setName] = useState("")
    const [photo, setPhoto] = useState("")
    const [status, setStatus] = useState("")
    const [categories, setCategories] = useState([])
    const [valueCategory, setValueCategory] = useState([])
    const [valueTag, setValueTag] = useState([])
    const [tags, setTags] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()

    const updatePet = async (e) => {
        e.preventDefault()
        await axios.put(`${endpoint}/pet`, {
            id: id,
            name: name,
            category_fk: valueCategory,
            tag_fk: valueTag,
            photoUrls: photo,
            status: status
        });
        navigate('/pets')
    }

    const getAllCategories = async () => {
		const response = await axios.get(`${endpoint}/categories`);
		setCategories(response.data.data);
	};

    const getAllTags = async () => {
		const response = await axios.get(`${endpoint}/tags`);
		setTags(response.data.data);
	};

    const addPet = async (e) => {
        e.preventDefault()
        await axios.post(`${endpoint}/pet`,
        {
            name: name,
            category_fk: valueCategory,
            tag_fk: valueTag,
            photoUrls: photo,
            status: status
        })
        navigate('/pets')
    }

    const Back = () => {
        navigate('/pets')
    }

    if (props.opc === 'add'){
        useEffect(() => {
            getAllCategories()
            getAllTags()
        }, [])
    }

    if (props.opc === 'edit') {
        useEffect(() => {
            getAllCategories()
            getAllTags()
            const getPetById = async () => {
                const response = await axios.get(`${endpoint}/pet/${id}`);
                setName(response.data.data.name)
                setValueCategory(response.data.data.category_fk)
                setValueTag(response.data.data.tag_fk)
                setStatus(response.data.data.status)
            }
            getPetById()
        }, [])
    }

    return(
        <div className='container'>
            <div className="cstm-card card mt-5 mb-5">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-2">
                            <button onClick={Back} className="btn btn-secondary">
                                <i className="fa-solid fa-backward"></i>
                            </button>
                        </div>

                        <div className="col-md-10">
                            {props.opc === 'edit' ? (
                                <Title title="Edit Pet" size="h3"/>
                            ) : (
                                <Title title="New Pet" size="h3"/>

                            )}
                        </div>
                    </div>

                </div>
                <div className="card-body">
                {props.opc === 'edit' ? (
                    <form onSubmit={updatePet}>
                        <div className="row">
                            <div className='col-12'>
                                <div className='mb-3'>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type='text'
                                        className='form-control'
                                        placeholder='Name'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <select className="form-select" onChange={(e) => setCategories(e.target.value)}>
                                        <option value="">Select a category</option>
                                        {categories.map(category => (
                                            <option key={category.id}
                                            selected={category.id === valueCategory}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <select className="form-select" onChange={(e) => setTags(e.target.value)}>
                                        <option value="">Select a Tag</option>
                                        {tags.map(tag => (
                                            <option key={tag.id} selected={tag.id === valueTag}>
                                                    {tag.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className='mb-3'>
                                    <input type='file' className='form-control'
                                        value={photo}
                                        onChange={(e) => setPhoto(e.target.value)}/>
                                </div>

                                <div className='mb-3'>
                                    <select className="form-select" onChange={(e) => setStatus(e.target.value)}>
                                        <option value="">Select a status</option>
                                        <option value="available" selected={status === "available"}>Available</option>
                                        <option value="pending" selected={status === "pending"}>Pending</option>
                                        <option value="sold" selected={status === "sold"}>Sold</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary'>Update</button>
                    </form>
                ) : (
                    <form onSubmit={addPet}>
                        <div className="row">
                            <div className='col-12'>
                                <div className='mb-3'>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type='text'
                                        className='form-control'
                                        placeholder='Name'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <select className="form-select" onChange={(e) => setValueCategory(e.target.value)}>
                                        <option value="">Select a Category</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <select className="form-select" onChange={(e) => setValueTag(e.target.value)}>
                                        <option value="">Select a Tag</option>
                                        {tags.map(tag => (
                                            <option key={tag.id} value={tag.id}>
                                                    {tag.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className='mb-3'>
                                    <input type='file' className='form-control'
                                        value={photo}
                                        onChange={(e) => setPhoto(e.target.value)}/>
                                </div>

                                <div className='mb-3'>
                                    <select className="form-select" onChange={(e) => setStatus(e.target.value)}>
                                        <option value="">Select a status</option>
                                        <option value="available">Available</option>
                                        <option value="pending">Pending</option>
                                        <option value="sold">Sold</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary'>Save</button>
                    </form>
                )}
                </div>
            </div>
        </div>
    )
}