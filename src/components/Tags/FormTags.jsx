import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../Title/Title";

const endpoint = 'http://localhost:8000/api/tag/'

export default function FormTags(props){
    const [name, setName] = useState("")
    const navigate = useNavigate()
    const { id } = useParams()

    const updateTag = async (e) => {
        e.preventDefault()
        await axios.put(`${endpoint}${id}`, {
            name: name
        });
        navigate('/tags')
    }

    const addTag = async (e) => {
        e.preventDefault()
        await axios.post(endpoint, { name: name })
        navigate('/tags')
    }

    const Back = () => {
        navigate('/tags')
    }

    if (props.opc === 'edit') {
        useEffect(() => {
            const getTagById = async () => {
                const response = await axios.get(`${endpoint}${id}`);
                setName(response.data.data[0].name)
            }
            getTagById()
        }, [])
    }

    return(
        <div className='container'>
            <div className="cstm-card card-form card mt-5 mb-5 border-primary">
                <div className="card-header bg-primary text-white">
                    <div className="row">
                        <div className="col-md-2">
                            <button onClick={Back} className="btn btn-secondary">
                                <i class="fa-solid fa-backward"></i>
                            </button>
                        </div>

                        <div className="col-md-10">
                            {props.opc === 'edit' ? (
                                <Title title="Edit Tag" size="h3"/>
                            ) : (
                                <Title title="New Tag" size="h3"/>

                            )}
                        </div>
                    </div>

                </div>
                <div className="card-body">
                {props.opc === 'edit' ? (
                    <form onSubmit={updateTag}>
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
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary'>Update</button>
                    </form>
                ) : (
                    <form onSubmit={addTag}>
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