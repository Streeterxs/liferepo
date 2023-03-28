// eslint-disable-next-line
export enum AttemptEnum {
    LOGGED = 'logged',
    WRONG_PASSWORD = 'wrong_password',
    CLOSED = 'closed',
}

export const getAttempt = (lastContent: string) => {
    console.log({ lastContent })
    const hasLogged =
        lastContent.includes('session opened for user') ||
        lastContent.includes('session closed for user')
    if (hasLogged) {
        return AttemptEnum.LOGGED
    }

    const hasWrongedPassword = lastContent.includes('authentication failure')
    if (hasWrongedPassword) {
        return AttemptEnum.WRONG_PASSWORD
    }

    const hasClosed =
        lastContent.includes('incorrect password attempts') ||
        lastContent.includes('incorrect password attempt') ||
        lastContent.includes('auth could not identify password for')
    if (hasClosed) {
        return AttemptEnum.CLOSED
    }
}
