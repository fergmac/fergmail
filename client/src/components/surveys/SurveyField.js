// SurveyField contains logic to render a single label and content

import React from 'react';

export default ({ input }) => {
    return (
        <div>
            <input {...input} />
        </div>
    );
};