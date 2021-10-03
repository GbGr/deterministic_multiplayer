import { InjectionToken } from 'tsyringe'

export const PLATFORM_ID: InjectionToken<Platform> = Symbol.for('PLATFORM_ID')

export enum Platform {
    BROWSER = 'BROWSER',
    SERVER = 'SERVER',
}
