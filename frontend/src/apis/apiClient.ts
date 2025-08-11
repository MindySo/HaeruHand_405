// 공통 API 클라이언트
class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = 'http://i13a405.p.ssafy.io/api';
  }

  private getHeaders(): Record<string, string> {
    const accessToken =
      sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

    const headers: Record<string, string> = {
      Accept: 'application/json',
    };

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return headers;
  }

  private getHeadersWithContentType(): Record<string, string> {
    const headers = this.getHeaders();
    headers['Content-Type'] = 'application/json';
    return headers;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  }

  async post<T>(endpoint: string, body?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeadersWithContentType(),
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  }

  async put<T>(endpoint: string, body?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeadersWithContentType(),
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  }

  // 파일 업로드를 위한 특별한 메서드
  async uploadFile(signedUrl: string, file: File): Promise<void> {
    const response = await fetch(signedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed! status: ${response.status}, message: ${errorText}`);
    }
  }
}

export const apiClient = new ApiClient();
