import * as Hive from '@hiveio/dhive';
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { UPDATE_TARGET, UPDATE_TARGET_AUTHORITY } from '../interfaces';

interface IUpdateWeightProps { 
    showForm:boolean,
    setShowForm:Function,
    setNewWeight: Function,
    setOwnerKey: Function,
    targetAuthType: string | UPDATE_TARGET_AUTHORITY,
    targetAccountType: string | UPDATE_TARGET,
    targetAuthAccount: [string | Hive.PublicKey,number]
}

export const UpdateWeight = ({showForm, setShowForm, setOwnerKey,
                                setNewWeight, targetAuthType,
                                targetAccountType, targetAuthAccount}:IUpdateWeightProps) => {
    const [weight, setWeight] = useState<number>(targetAuthAccount[1])
    const [show, setShow] = useState(showForm);
    
    useEffect(() => {
        setShow(showForm)
    },[showForm])
    useEffect(() => {
        if(!show){
        setShowForm(show)
        }
    },[show])

    const handleClose = () => setShow(false);
    
    const hanleUpdate = () => {
        setNewWeight(weight)
        setShow(false);
    }
    const numberInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const eventCode = event.code.toLowerCase();
        if (!(event.code !== null
        && (eventCode.includes("digit")
            || eventCode.includes("arrow")
            || eventCode.includes("home")
            || eventCode.includes("end")
            || eventCode.includes("backspace") 
            || (eventCode.includes("numpad") && eventCode.length === 7)))
        ) {
        event.preventDefault();
        }
    };
    return(
        <div>
            <Modal show={show} onHide={() => {handleClose()}}>
                <Modal.Header closeButton>
                <Modal.Title>Update Weight</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            {/* authority type */}
                            {/* account/key name */}
                            {/* current weight */}
                            <h2>{targetAuthType +" Authority"}</h2>
                            <b className="text-secondary">{targetAccountType+": "}</b> {targetAuthAccount[0].toString()} <br/>
                            <b className="text-secondary">Weight: </b> {targetAuthAccount[1].toString()} <br/>
                            {targetAuthType === 'Owner'|| targetAuthType ==='Posting'? 
                                <Form.Control
                                type="text"
                                placeholder="Enter Owner Key"
                                autoFocus
                                onChange = {e => {setOwnerKey(e.target.value)}}
                                />
                                :<div></div>
                            }
                            <Form.Control
                            type="number"
                            placeholder="Assign new weight"
                            autoFocus
                            onKeyDown={numberInputKeyDown}
                            onChange = {e => {setWeight(+e.target.value)}}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => {handleClose()}}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {hanleUpdate()}}>
                    Update
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}