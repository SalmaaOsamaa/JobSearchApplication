import {render,screen} from '@testing-library/react'
import SkillDetailsPage from '../main/SkillDetailsPage'

describe('testing async function', () => {
test('renders jobs if request succeeds', async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
        json:async () => [
            {
                data: {
                  job: {
                    id: "9b92abe6-3bf3-4cc6-8744-4de0c8af0630",
                    type: "job",
                    attributes: {
                      title: "Engineering Manager"
                    },
                }
            }
        }
        ]
    })
    render(<SkillDetailsPage/>)

    // const renderedListItems = await screen.findAllByRole('div', { name: 'card' });
    // expect(renderedListItems).not.toHaveLength(0);
})
test('renders skills if request succeeds', async () => {
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