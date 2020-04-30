import React from 'react';
import {useHistory} from 'react-router-dom';
import {Button} from 'neutrino-ui';
import {Page} from '../common'

export function HomePage() {
    const history = useHistory();

    const handleRedirect = (e: React.PointerEvent<HTMLButtonElement>) => {
        const name = e.currentTarget.name;
        history.push(`/${name}`);
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
