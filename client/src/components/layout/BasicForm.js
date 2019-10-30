import React from 'react';

function EditForm(props) {
  const {
    changingValue,
    changingValueName,
    cancelText = 'إلغاء',
    submitText = 'تأكيد',
    placeholder,
    onChangeMethod,
    submitMethod,
    cancelMethod,
  } = props;

  return (
    <div>
      <form onSubmit={submitMethod}>
        <div className="row">
          <div className="form-group col-sm-6">
            <textarea
              className="form-control"
              name={changingValueName}
              cols="10"
              rows="5"
              placeholder={placeholder}
              value={changingValue}
              onChange={onChangeMethod}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <div className="clearfix">
            <input
              type="submit"
              value={submitText}
              className="btn btn-outline-success float-right"
            />
            <input
              type="button"
              value={cancelText}
              className="btn btn-outline-danger float-right"
              onClick={cancelMethod}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
