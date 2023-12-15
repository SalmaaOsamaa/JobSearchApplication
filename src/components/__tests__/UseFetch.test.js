import {  renderHook } from '@testing-library/react';
import { useFetch } from '../../hooks/useFetch';

describe('useFetch',()=> {
    test('should render the initial data value ', ()=> {
        const {result} = renderHook(useFetch)
        expect (result.current.data).toBe(null)
    })

})