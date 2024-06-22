export async function GET(req) {
    const url = new URL(req.url);
    const topic = url.searchParams.get('topic');
  
    const additionalQuestions = {
      Technology: [
        { id: 1, question: "What's your favorite tech stack?", value: '' },
        { id: 2, question: "How do you stay updated with tech trends?", value: '' },
      ],
      Health: [
        { id: 1, question: "How many hours do you sleep daily?", value: '' },
        { id: 2, question: "Do you follow any specific health regime?", value: '' },
      ],
      Education: [
        { id: 1, question: "What inspired you to pursue your field of study?", value: '' },
        { id: 2, question: "Are you involved in any research projects?", value: '' },
      ],
    };
  
    return new Response(JSON.stringify(additionalQuestions[topic] || []), {
      status: 200,
    });
  }
  