import {OfferPageQueryResult} from '@/sanity.types'

type TServices = NonNullable<NonNullable<OfferPageQueryResult>['services']>
type TService = TServices[number]

export type TVariants = NonNullable<TService['variants']>
