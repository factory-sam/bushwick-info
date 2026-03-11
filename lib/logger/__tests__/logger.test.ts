import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock pino before importing the logger
vi.mock("pino", () => {
  const mockChild = vi.fn(() => mockLogger);
  const mockLogger = {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    child: mockChild,
  };
  return {
    default: vi.fn(() => mockLogger),
  };
});

describe("logger", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("exports logger instance", async () => {
    const { logger } = await import("../index");
    expect(logger).toBeDefined();
    expect(typeof logger.info).toBe("function");
    expect(typeof logger.warn).toBe("function");
    expect(typeof logger.error).toBe("function");
  });

  it("exports createLogger function", async () => {
    const { createLogger } = await import("../index");
    expect(typeof createLogger).toBe("function");
  });

  it("createLogger creates child logger with context", async () => {
    const { createLogger, logger } = await import("../index");
    const childLogger = createLogger({ component: "test" });

    expect(logger.child).toHaveBeenCalledWith({ component: "test" });
    expect(childLogger).toBeDefined();
  });

  it("exports pre-configured component loggers", async () => {
    const { mapLogger, dataLogger, apiLogger } = await import("../index");

    expect(mapLogger).toBeDefined();
    expect(dataLogger).toBeDefined();
    expect(apiLogger).toBeDefined();
  });
});
