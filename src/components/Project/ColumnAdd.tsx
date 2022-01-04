import React, { useRef } from 'react'

const ColumnAdd: React.FC<{ onAddColumnClick: (columnName: string) => void, hideShowAddColumn: () => void }> = (props) => {
    const columnNameRef = useRef<HTMLInputElement>(null)

    return (
        <section className='mt-3'>
            <div className='card box-shadow'>
                <div className='card-header'>
                    <strong>Add Column</strong>
                </div>
                <div className='card-body'>
                    <form className='form' onSubmit={(e: React.FormEvent) => { e.preventDefault() }}>
                        <div className='form-group'>
                            <label htmlFor='columnName'>Column Name</label>
                            <input ref={columnNameRef} type='text' id='columnName' name='columnName' className='form-control' required autoFocus />
                        </div>
                        <div className='form-group'>
                            <input type='button' value='Save' className='btn btn-sm btn-success mr-3' onClick={() => props.onAddColumnClick(columnNameRef.current!.value)} />
                            <input type='button' value='Cancel' className='btn btn-sm btn-secondary' onClick={props.hideShowAddColumn} />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ColumnAdd