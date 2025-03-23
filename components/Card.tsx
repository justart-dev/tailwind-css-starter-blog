import Link from './Link'
import React from 'react';

const Card = ({ title, description, href }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={`overflow-hidden rounded-md border-2 border-gray-200/60 dark:border-gray-700/60`}
    >
      <div className="p-6">
        <h2 className="mb-3 text-2xl leading-8 font-bold tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <div className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400 whitespace-pre-wrap">
          {description.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < description.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        {href && (
          <Link
            href={href}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-base leading-6 font-medium"
            aria-label={`Link to ${title}`}
          >
            살펴보기 &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
