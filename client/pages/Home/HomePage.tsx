import React, {useState} from 'react';
import {Button} from 'neutrino-ui';
import {Page} from '../common'

export function HomePage() {
    const [formType, setForm] = useState(null);

    const handleRedirect = (e: React.PointerEvent<HTMLButtonElement>) => {
        const name = e.currentTarget.name;
        setForm(name);
    }
    return (
        <Page>
            <div css={{display: 'flex', flexFlow: 'row nowrap', width: '50%', justifyContent: 'space-around'}}>
                <Button name="login" type="button" variant="primary" onClick={handleRedirect}>
                    Login
                </Button>
                <Button name="registration" variant="secondary" onClick={handleRedirect}>
                    Registration
                </Button>
            </div>
        </Page>
    )
}
