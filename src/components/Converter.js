import React from 'react'
import PropTypes from 'prop-types'
import './Converter.css';

function Converter(props) {
    const[data_color, setColorValue] = React.useState({
        str: '',
        result: '',

        color_style: {backgroundColor: 'beige'},
        color_result: {backgroundColor: 'grey'}
    });

    const funOnChange = (evt) => {

        let new_value = evt.target.value;
        console.log('new_value = ' + new_value);

        let rgb_result = '';
        let v_color_style = null;
        let v_color_result = null;

        if (new_value.length < 7)
        {
            rgb_result = '';
            v_color_style = {backgroundColor: 'beige'};
            v_color_result = {backgroundColor: 'grey'};
        }
        else if (CheckStrColor(new_value.toLowerCase()))
        {
            rgb_result = ConvertColor(new_value.toLowerCase());
            v_color_style = {backgroundColor: rgb_result};
            v_color_result = {backgroundColor: 'grey'};
        }
        else
        {
            rgb_result = 'Ошибка!';
            v_color_style = {backgroundColor: 'red'};
            v_color_result = {backgroundColor: 'brown'};
        }

        setColorValue(prevColor => ({...prevColor,
            str: new_value,
            result: rgb_result,
            color_style: v_color_style,
            color_result: v_color_result
        }));
    }

    // Проверяем корректность значения
    function CheckStrColor(str)
    {
        let result = true;

        if (str.substring(0, 1) != '#')
        {
            result = false;
        }
        else
        {
            let value = parseInt(str.substring(1), 16);

            if (isNaN(value))
            {
                result = false;
            }
            else
            {
                let str1 = str.substring(1, 3);
                let str2 = str.substring(3, 5);
                let str3 = str.substring(5, 7);
                let str4 = str.substring(6, 7);     // Отдельно проверяем последний символ



                let r = parseInt(str1, 16);
                let g = parseInt(str2, 16);
                let b = parseInt(str3, 16);
                let t = parseInt(str4, 16);

                if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(t))
                    result = false;
            }
        }

        console.log('CheckStrColor = ' + result);

        return result;
    }

    function ConvertColor(str)
    {
        let result = 'rgb(0, 255, 0)';

        let str1 = str.substring(1, 3);
        let str2 = str.substring(3, 5);
        let str3 = str.substring(5, 7);

        let r = parseInt(str1, 16);
        let g = parseInt(str2, 16);
        let b = parseInt(str3, 16);

        result = 'rgb(' + r + ', ' + g + ', ' + b + ')';

        console.log('ConvertColor = ' + result);

        return result;
    }


    return (

        <form id="converter">
            <div id="container" style={data_color.color_style}>
                <input id="hex_code" name="hex_code" type="text" value={data_color.str} onChange={funOnChange} />
                <input id="rgb_result" name="hex_code" type="text" value={data_color.result} style={data_color.color_result} readOnly/>
            </div>
        </form>
    );
}

Converter.propTypes = {
}

export default Converter;
