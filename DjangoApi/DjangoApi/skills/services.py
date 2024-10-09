import requests
import os
import openai
import json
from datetime import datetime

os.environ['SERP_API_KEY'] = '3a5573ceeba8aa5ed4a78757812aa8e962e10b9a5c4545f90eb797e3b19856b4'
os.environ['GPT_API'] = 'sk-proj-OrZ84OQQNXsOUe17VXRhT3BlbkFJV6RInv8tTnShRaw0hJT8'
serp_api_key = os.environ.get('SERP_API_KEY')
gpt_api = os.environ.get('GPT_API')


class SkillsService:
    def __init__(self, work_type):
        self.work_type = work_type
        self.jobs = self._fetch_jobs()
        self.skills = self.get_skills()

    def _fetch_jobs(self):
        url_work_type = self.work_type.replace(" ", "+")
        url = f'https://serpapi.com/search.json?engine=google_jobs&q={url_work_type}&hl=en&api_key={serp_api_key}'
        try:

            response = requests.get(url)
            response.raise_for_status()
            return response.json().get('jobs_results', [])
        except requests.RequestException as e:
            print(f"Error fetching jobs: {e}")
            return []

    def get_skills(self):
        raw_skills = self._extract_raw_skills()
        processed_skills = self._process_skills_with_gpt(raw_skills)
        print(processed_skills)
        return processed_skills

    def _extract_raw_skills(self):
        raw_skills = ''
        for job in self.jobs:
            job_highlights = job.get('job_highlights', [])
            if job_highlights:
                items = job_highlights[0].get('items', [])
                raw_skills += '\n -------------------------------- \n'
                raw_skills += '\n '.join(items)
        return raw_skills

    def _process_skills_with_gpt(self, raw_data, retry_count=5):
        client = openai.OpenAI(api_key=gpt_api)

        tools = [
            {
                "type": "function",
                "function": {
                    "name": "get_skills_from_jobs",
                    "description": "Get the skills and skills info from the raw jobs data. return only skills that appears in 30% of plus of the jobs",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "Skills": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "skill": {
                                            "type": "string",
                                            "description": "the skill string",
                                        },
                                        "count": {
                                            "type": "string",
                                            "description": "The Count of How many times the skill appears in the total jobs"
                                        },
                                        "type": {
                                            "type": "string",
                                            "enum": ["Programming skill", "Soft skill"],
                                            "description": "The category of the skill"
                                        }

                                    }
                                }
                            }
                        }

                    }
                },
                "required": ["raw_jobs_data"],
            }
        ]
        messages = [
            {"role": "user", "content": f"Get the skills and skills info from the raw jobs data.{raw_data}"}]
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            tools=tools,
            tool_choice={"type": "function", "function": {"name": "get_skills_from_jobs"}}
        )

        # print(completion.choices[0].message.tool_calls[0].function.arguments)
        function_response = completion.choices[0].message.tool_calls[0].function.arguments
        skills_data = json.loads(function_response)['Skills']

        required_keys = {'skill', 'count', 'type'}

        if required_keys.issubset(skills_data[0].keys()):
            return skills_data
        else:
            if retry_count > 0:
                # Retry with the same raw_data
                print('call again')
                return self._process_skills_with_gpt(raw_data, retry_count - 1)
            else:
                # Handle the case where retries are exhausted
                raise ValueError("Unable to retrieve skills data with all required keys.")