import React, { FC } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import CurrencyLogo from '../../components/CurrencyLogo'
import useLimitOrders from '../../hooks/useLimitOrders'
import Badge from '../../components/Badge'
import Lottie from 'lottie-react'
import loadingCircle from '../../animation/loading-circle.json'
import { JSBI, Percent } from '@sushiswap/sdk'

const CompletedOrders: FC = () => {
  const { i18n } = useLingui()
  const { completed, loading } = useLimitOrders()

  return (
    <>
      <div className="text-xl text-high-emphesis flex items-center gap-2 border-b border-dark-800 pb-4">
        {i18n._(t`Order History`)}{' '}
        <span className="inline-flex">
          <Badge color="pink" size="medium">
            {completed.length}
          </Badge>
        </span>
      </div>
      <div className="text-secondary text-center">
        {completed.length > 0 ? (
          <>
            <div className="grid grid-flow-col grid-cols-3 md:grid-cols-4 gap-4 px-4 pb-4 text-sm text-secondary font-bold">
              <div className="flex items-center cursor-pointer hover:text-primary">{i18n._(t`Receive`)}</div>
              <div className="flex items-center cursor-pointer hover:text-primary">{i18n._(t`Pay`)}</div>
              <div className="flex items-center cursor-pointer hover:text-primary text-left hidden md:block">
                {i18n._(t`Rate`)}
              </div>
              <div className="flex items-center cursor-pointer hover:text-primary justify-end">{i18n._(t`Filled`)}</div>
            </div>
            <div className="flex flex-col-reverse gap-2 md:gap-5">
              {completed.map((order, index) => (
                <div
                  key={index}
                  className="block text-high-emphesis bg-dark-800 overflow-hidden rounded"
                  style={{
                    background: order.filled
                      ? 'linear-gradient(90deg, rgba(0, 255, 79, 0.075) 0%, rgba(0, 255, 79, 0) 50%), #202231'
                      : order.isCanceled
                      ? 'linear-gradient(90deg, rgba(0, 255, 79, 0.075) 0%, rgba(0, 255, 79, 0) 50%), #202231'
                      : 'linear-gradient(90deg, rgba(255, 56, 56, 0.15) 0%, rgba(255, 56, 56, 0) 50%), #202231',
                  }}
                >
                  <div className="grid items-center grid-flow-col grid-cols-3 md:grid-cols-4 gap-4 px-4 py-3 text-sm align-center text-primary">
                    <div className="flex flex-col">
                      <div className="flex gap-4 font-bold items-center">
                        <div className="min-w-[32px] flex items-center">
                          <CurrencyLogo size={32} currency={order.tokenOut} />
                        </div>
                        <div className="flex flex-col">
                          <div>{order.limitOrder.amountOut.toSignificant(6)} </div>
                          <div className="text-left text-secondary text-xs">{order.tokenOut.symbol}</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-left font-bold">
                      <div className="flex flex-col">
                        <div>{order.limitOrder.amountIn.toSignificant(6)} </div>
                        <div className="text-left text-secondary text-xs">{order.tokenIn.symbol}</div>
                      </div>
                    </div>
                    <div className="hidden md:block text-left font-bold">
                      <div>
                        {new Percent(order.limitOrder.amountOut.quotient, order.limitOrder.amountIn.quotient)
                          .divide(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(0)))
                          .toSignificant(6)}
                      </div>
                      <div className="text-xs text-secondary">
                        {order.tokenOut.symbol} per {order.tokenIn.symbol}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mb-1">
                        {order.filled ? (
                          <span className="text-green">{i18n._(t`Filled`)}</span>
                        ) : order.isCanceled ? (
                          <span className="text-secondary">{i18n._(t`Cancelled`)}</span>
                        ) : (
                          <span className="text-red">{i18n._(t`Expired`)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : loading ? (
          <div className="w-8 m-auto">
            <Lottie animationData={loadingCircle} autoplay loop />
          </div>
        ) : (
          <span>{i18n._(t`No order history`)}</span>
        )}
      </div>
    </>
  )
}

export default CompletedOrders