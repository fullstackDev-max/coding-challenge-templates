import React, { useEffect, useState } from 'react'

const SupervisorForm = () => {
    const initialValue = {
        firstName: '',
        lastName: '',
        notifyByEmail: false,
        notifyByPhone: false,
        email: '',
        phoneNumber: '',
        supervisor: '',
    }

    const [formValues, setFormValues] = useState(initialValue)
    const [supervisors, setSupervisors] = useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const filterResult = (result) => {
        result = result.filter((item) => isNaN(item.jurisdiction))

        function compare(prev, curr) {
            if (prev.jurisdiction === curr.jurisdiction) {
                if (prev.lastName === curr.lastName) {
                    return prev.firstName.localeCompare(curr.firstName)
                } else {
                    return prev.lastName.localeCompare(curr.lastName)
                }
            } else {
                return prev.jurisdiction > curr.jurisdiction ? 1 : -1
            }
        }

        result.sort(compare)
        return result
    }

    useEffect(async () => {
        const result = await fetch(
            'https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers'
        )
            .then((res) => res.json())
            .catch((error) => {
                console.error('Error: ', error)
                return []
            })
        if (result?.length) {
            setSupervisors(filterResult(result))
        }
    }, [])

    const onChange = (e) => {
        setFormValues((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onCheck = (e) =>
        setFormValues((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.checked,
        }))

    const validateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true
        }
        return false
    }

    const validateName = (name) => Boolean(name && !/\d/.test(name))

    const isNotValidPayload = () => {
        if (!validateName(formValues.firstName)) {
            return 'Please enter valid first name'
        } else if (!validateName(formValues.lastName)) {
            return 'Please enter valid last name'
        } else if (
            formValues.notifyByEmail &&
            !validateEmail(formValues.email)
        ) {
            return 'You have entered an invalid email address!'
        } else if (formValues.notifyByPhone && !formValues.phoneNumber) {
            return 'Please enter valid phone number'
        } else if (!formValues.supervisor) {
            return 'Please select any one supervisor'
        }
        return false
    }

    const onSubmit = async () => {
        const isNotValid = isNotValidPayload()
        if (isNotValid) {
            alert(isNotValid)
            return
        }

        const payload = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            supervisor: supervisors.find(
                (superVisor) => superVisor.id === formValues.supervisor
            ),
        }

        if (formValues.notifyByEmail) {
            payload['email'] = formValues.email
        }
        if (formValues.notifyByPhone) {
            payload['phoneNumber'] = formValues.phoneNumber
        }

        const result = await fetch(
            'http://localhost:8080/api/supervisor/submit',
            {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((res) => res.json())
            .catch((error) => error)
            .finally(() => {
                setError('')
                setSuccess('')
            })

        if (result?.error) {
            setError(result?.error?.message || '')
        } else {
            setSuccess('Notification Sent!')
            setFormValues({ ...initialValue })
        }
    }

    return (
        <div className="container w-50">
            <div className="row justify-content-md-center bg-light">
                <div className="p-3 mb-2 bg-info text-dark text-center">
                    Notification Form
                </div>
                {(error || success) && (
                    <div
                        className={`alert alert-${
                            error ? 'danger' : success ? 'success' : ''
                        } p-1 d-flex justify-content-between align-items-center`}
                        role="alert"
                    >
                        <span>{error || success}</span>
                        <span
                            onClick={() => {
                                setError('')
                                setSuccess('')
                            }}
                            style={{
                                cursor: 'pointer',
                                fontSize: '24px',
                                margin: '0',
                                padding: '0',
                            }}
                            aria-hidden="true"
                        >
                            &times;
                        </span>
                    </div>
                )}
                <div className="w-100">
                    <form>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label for="firstName">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        placeholder="Enter First Name"
                                        value={formValues.firstName}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label for="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        placeholder="Enter Last Name"
                                        value={formValues.lastName}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <small className="mb-2">
                                How would you prefer to get notified?
                            </small>
                            <div className="col">
                                <div className="form-group">
                                    <div className="d-flex gap-2">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id="notifyByEmail"
                                            checked={formValues.notifyByEmail}
                                            onChange={onCheck}
                                        />
                                        <label for="email">Email</label>
                                    </div>

                                    <input
                                        disabled={!formValues.notifyByEmail}
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter email"
                                        value={formValues.email}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <div className="d-flex gap-2">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id="notifyByPhone"
                                            checked={formValues.notifyByPhone}
                                            onChange={onCheck}
                                        />
                                        <label for="phoneNumber">
                                            Phone Number
                                        </label>
                                    </div>

                                    <input
                                        disabled={!formValues.notifyByPhone}
                                        type="tel"
                                        className="form-control"
                                        id="phoneNumber"
                                        placeholder="Enter Phone Number"
                                        value={formValues.phoneNumber}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="d-flex justify-content-center">
                                <select
                                    className="form-select w-50"
                                    aria-label="Default select example"
                                    id="supervisor"
                                    value={formValues.supervisor}
                                    onChange={onChange}
                                >
                                    <option value="" selected disabled>
                                        Select Supervisor
                                    </option>
                                    {supervisors.map((supervisor) => (
                                        <option
                                            value={supervisor.id}
                                        >{`${supervisor.jurisdiction} - ${supervisor.lastName}, ${supervisor.firstName}`}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row mt-4 mb-2">
                            <div className="d-flex justify-content-center">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={onSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SupervisorForm
