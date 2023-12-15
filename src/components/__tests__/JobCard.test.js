import JobCard from '../main/JobCard'

describe('testing async function', () => {
    test('renders each skill with attributes if request succeeds', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json:async () => [
                {
                    data: {
                      skill: {
                        id: "9f0a0811-4a8e-4c8a-b4ce-adc9267b1cf3",
                        type: "skill",
                        attributes: {
                          name: "React",
                        }
                    }
                }
            }
            ]
        })
    
    })
   
    })