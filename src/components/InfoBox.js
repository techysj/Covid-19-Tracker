import React from 'react'
import { Card,CardContent} from "@material-ui/core";
import '../components/infobox.css';
function InfoBox({title,cases,total}) {
    return (
            <Card className='infobox'>
                <CardContent>
                    {/* title-eg recovered,infefted */}
                    <p className='infobox_title' >{title}</p>
                    {/* cases   */}
                    <h3 className='infobox_cases' >{cases} {title} today</h3>
                    {/* total no of cases */}
                    <p className='infobox_total'>total {total}</p>


                </CardContent>

            </Card>
            
        
    )
}

export default InfoBox
