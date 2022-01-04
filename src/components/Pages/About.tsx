import React from 'react'

const About: React.FC<{}> = () => {
    return (
        <div className='container' style={{ paddingTop: '135px' }}>
            <div className='row'>
                <div className='col'>
                    <div className='jumbotron text-center'>
                        <h1>React TypeScript Demo Project</h1>

                        <p>
                            This project shows the basic features associated with creating a vanilla React application using TypeScript. It is a Kanban task board
                            that uses react-beautiful-dnd for drag and drop functionality. Highly influenced by the GitHub project layout.
                        </p>
                    </div>
                    <div className='row mb-4'>
                        <div className='col'>
                            <h2 className='h3'>Getting Started with React TypeScript</h2>

                            <p>
                                To get started with a vanilla application run the following commands in console.
                            </p>
                            <div className='highlight alert bg-light'>
                                npx create-react-app my-app --template typescript<br />
                                cd my-app<br />
                                npm start<br />
                            </div>
                        </div>
                    </div>
                    <div className='row mb-4'>
                        <div className='col'>
                            <h4>Other Useful Packages</h4>

                            <p>
                                ReactDOM for setting Routes, React Icons for icon libraries such as Bootstrap,
                                Sass to add support for advanced stylesheets, and Jest (for TypeScript with React Testing Library)
                                for testing and code overage.
                            </p>
                            <div className='highlight alert bg-light'>
                                npm i react-dom<br />
                                npm i react-icons<br />
                                npm i sass<br />
                                npm i jest<br />
                                npm i ts-jest<br />
                                npm i @types/jest<br />
                                npm i @testing-library/react @testing-library/jest-dom<br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About