import React from 'react'

const ProjectHeader: React.FC<{ project: any }> = (props) => {
    return (
        <div className='page-header'>
            <div className='container max-width'>
                <div className='row'>
                    <div className='col'>
                        <h1>{props.project.name}</h1>
                        <h2>{props.project.description}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectHeader