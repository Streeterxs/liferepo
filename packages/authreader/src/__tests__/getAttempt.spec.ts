import { AttemptEnum, getAttempt } from '../getAttempt'

const loggedMessageOpened =
    'Mar 26 19:30:01 Deathstar CRON[22929]: pam_unix(cron:session): session opened for user root by (uid=0)'
const loggedMessageClosed =
    'Mar 26 19:30:01 Deathstar CRON[22929]: pam_unix(cron:session): session closed for user root'

const wrongPasswordMes =
    'Mar 28 17:27:00 Deathstar sudo: pam_unix(sudo:auth): authentication failure; logname= uid=1000 euid=0 tty=/dev/pts/3 ruser=streeterxs rhost=  user=streeterxs'

it('should return logged from auth attempt session openned', () => {
    const attempt = getAttempt(loggedMessageOpened)

    expect(attempt).toBe(AttemptEnum.LOGGED)
})

it('should return logged from auth attempt session closed', () => {
    const attempt = getAttempt(loggedMessageClosed)

    expect(attempt).toBe(AttemptEnum.LOGGED)
})

it('should return wrong password from auth attempt wrong password input', () => {
    const attempt = getAttempt(wrongPasswordMes)

    expect(attempt).toBe(AttemptEnum.WRONG_PASSWORD)
})
