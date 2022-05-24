import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../Title/Title";


const endpoint = 'https://pets.diegochavez-dc.com/api/tag/'

export default function FormTags(props){
    const [name, setName] = useState("")
    const navigate = useNavigate()
    const { id } = useParams()

    const MySwal = withReactContent(Swal);

    const updateTag = async (e) => {
        e.preventDefault()
        const response = await axios.put(`${endpoint}${id}`, {
            name: name
        });
        const status = response.data.status;
        if ( status === 200) {
            Notifications('success', 'success', `Status: ${status}`, 'Tag updated successfully')
            Back()
        }
        if( status === 405){
            Notifications('error', 'error', `Status: ${status}`, 'Validation exception')
        }
    }

    const addTag = async (e) => {
        e.preventDefault()
        const response = await axios.post(endpoint, { name: name })
        const status = response.data.status;
        if ( status === 200) {
            Notifications('success', 'success', `Status: ${status}`, 'Tag added successfully')
            Back()
        }
        if( status === 405){
            Notifications('error', 'error', `Status: ${status}`, 'Validation exception')
        }
    }

    const Notifications = (type, icon, title, text) => {
        MySwal.fire({
            position: 'top-end',
            type: type,
            icon: icon,
            text: text,
            footer: title,
            ConfirmButton: confirm,
            confirmButtonColor: '#0D6EFD',
            confirmButtonText: 'Ok'
        })
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
                        <div className="col-sm-1 col-md-1 col-lg-1">
                            <button onClick={Back} className="btn btn-secondary">
                                <i className="fa-solid fa-backward"></i>
                            </button>
                        </div>

                        <div className="col-sm-10 col-md-10 col-lg-10">
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
                            <div className='col-sm-12 col-md-12 col-lg-12'>
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
                            <div className='col-sm-12 col-md-12 col-lg-12'>
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